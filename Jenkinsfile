pipeline {
   agent any
   stages {
      stage('Verify Branch') {
         steps {
            echo "$GIT_BRANCH"
         }
      }

      // stage('Docker Build') {
      //    steps {
      //       sh "docker images -a"
      //       sh "docker build -t jenkins-pipeline ./instrumentos-microservice/."
      //       sh "docker images -a"
            
      //    }
      // }

      // stage('Start test app') {
      //    steps {
      //       sh(script: """
      //          docker-compose up -d
      //          chmod +x -R ${env.WORKSPACE}
      //          ./scripts/test_container.sh
      //       """)
      //    }
      //    post {
      //       success {
      //          echo "App started successfully :)"
      //       }
      //       failure {
      //          echo "App failed to start :("
      //       }
      //    }
      // }

      // stage('Run Tests') {
      //    steps {
      //       sh(script: """
      //          pytest ./tests/test_sample.py
      //       """)
      //    }
      // }

      stage('Stop test app') {
         steps {
            sh(script: """
               ls
            """)
         }
      }

      stage('Push container') {
         environment {
            WEB_IMAGE_NAME="${ACR_LOGINSERVER}/siaraf/indep-siaraf_instrumentos:1.${BUILD_NUMBER}"
         }
         steps {
            echo "Workspace is $WORKSPACE"
            dir("$WORKSPACE")
            {
               script
               {
                  docker.withRegistry('https://acrindep.azurecr.io', 'acr-credentials')
                  {
                     def image = docker.build("$WEB_IMAGE_NAME")
                     image.push()
                  }
               }
            }
         }
      }


      stage('Deploying container.') {
                    
         environment {
            ENVIRONMENT = 'qa'
            WEB_IMAGE_NAME="${ACR_LOGINSERVER}/siaraf/indep-siaraf_instrumentos:1.${BUILD_NUMBER}"
         }
         steps {
            echo "Deploying to ${ENVIRONMENT}"
         
            sh(script: """
            # Update kubernetes deployment with new image.
            kubectl set image deployment/instrumentosms instrumentosms="$WEB_IMAGE_NAME"
            """)

         }
      }

   }
   
}
