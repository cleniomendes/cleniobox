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
			sh 'heroku container:login'
			sh 'docker build -t cleniobox-backend --no-cache .'		
			sh 'docker tag cleniobox-backend registry.heroku.com/docker-backend-cleniobox/web'
			sh 'docker push registry.heroku.com/docker-backend-cleniobox/web'
		}		        
      }
    }
  }
  catch (err) {
    throw err
  }
}