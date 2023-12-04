/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
const execShPromise = require('exec-sh').promise;

let fs = require('fs');

const projects = [
  { name: '' },

];

const config = {
  organization: '',
  gitKey: '',
  sonarServer: 'sonar-',
  jenkinsServer: 'jenkins-',
};

const createRepos = async () => {
  let out;
  try {
    for (const project of projects) {
      const jenkinsFile = getJenkinsFile(project.name);
      const sonarFile = getSonarFile(project.name);
      const readmeFile = getReadmeFile(project.name);

      fs.writeFileSync('Jenkinsfile', jenkinsFile);
      fs.writeFileSync('sonar-project.properties', sonarFile);
      fs.writeFileSync('README.md', readmeFile);

      let command0 = `git remote rm origin`;
      let command1 = `git add .`;
      let command2 = 'git commit -m Add_initial_files';

      let command3 = `hub create -p ${config.organization}/${project.name}`;
      let command4 = `git push origin master`;

      console.log('Deleting remote');
      out = await execShPromise(command0, true);

      console.log('Adding files');
      out = await execShPromise(command1, true);

      console.log('Commiting files');
      out = await execShPromise(command2, true);

      console.log('Creating repo: ', project.name);
      out = await execShPromise(command3, true);

      console.log('Push');
      out = await execShPromise(command4, true);
    }
  } catch (e) {
    console.log('Error: ', e);
    console.log('Stderr: ', e.stderr);
    console.log('Stdout: ', e.stdout);
    return e;
  }
  console.log('out: ', out.stdout, out.stderr);
};

createRepos();

function getReadmeFile(repo) {
  const content = `# Enlaces
  - [Jenkins](http://localhost/${config.jenkinsServer}/)
  - [Sonar](http://localhost/${config.sonarServer}/)`;
  return content;
}

function getSonarFile(repo) {
  const content = `sonar.host.url=http://localhost/${config.sonarServer}/
  sonar.projectKey=${repo}:sonar
  sonar.projectName=${repo}
  sonar.projectVersion=1.0
  sonar.sources=src
  sonar.test=src
  sonar.test.inclusions=**/*.spec.ts
  sonar.exclusions=**/*.module.ts, **/utils/**
  sonar.javascript.lcov.reportPaths=coverage/lcov.info`;
  return content;
}

function getJenkinsFile(repo) {
  const content = `pipeline {
    agent any
    environment {
       GIT_REPO = '${repo}'
       GIT_CREDENTIAL_ID = '${config.gitKey}'
       SONARQUBE_URL = '${config.sonarServer}'
    }
    stages {
       stage('Checkout') {
          steps {
             scmSkip(deleteBuild: true, skipPattern:'.*\\[ci-skip\\].*')
             git branch: 'master',
                credentialsId: env.GIT_CREDENTIAL_ID,
                url: 'https://github.com/${config.organization}/' + env.GIT_REPO
          }
       }
       stage('GitInspector') { 
         steps {
            withCredentials([usernamePassword(credentialsId: env.GIT_CREDENTIAL_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
               sh 'mkdir -p code-analyzer-report'
               sh """ curl --request POST --url https://localhost/analyze --header "Content-Type: application/json" --data '{"repo_url":"git@github.com:${config.organization}/\${GIT_REPO}.git", "access_token": "\${GIT_PASSWORD}" }' > code-analyzer-report/index.html """   
            }
            publishHTML (target: [
               allowMissing: false,
               alwaysLinkToLastBuild: false,
               keepAll: true,
               reportDir: 'code-analyzer-report',
               reportFiles: 'index.html',
               reportName: "GitInspector"
            ])
         }
      } 
      stage('Build') {
          // Build app
          steps {
             script {
                docker.image('citools-isis2603:latest').inside('-u root') {
                   sh '''
                      npm i -s
                      nest build
                   '''
                }
             }
          }
      }
      stage('Test') {
          steps {
             script {
                docker.image('citools-isis2603:latest').inside('-u root') {
                   sh '''
                      npm run test:cov
                   '''
                }
             }
          }
       }
       stage('Static Analysis') {
          // Run static analysis
          steps {
             sh '''
                docker run --rm -u root -e SONAR_HOST_URL=\${SONARQUBE_URL} -v \${WORKSPACE}:/usr/src sonarsource/sonar-scanner-cli:4.3
             '''
          }
       }
    }
    post {
      always {
        cleanWs()
        deleteDir() 
        dir("\${env.GIT_REPO}@tmp") {
          deleteDir()
        }
      }
   }
}`;
  return content;
}
