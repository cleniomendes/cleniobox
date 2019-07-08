node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
		dir ('backend') { 
			sh 'docker build -t backend --no-cache .'		
			sh 'docker tag backend registry.heroku.com/backend-cleniobox/web'
			sh 'docker push registry.heroku.com/backend-cleniobox/web'
		}		        
      }
    }
  }
  catch (err) {
    throw err
  }
}