pipeline {
   agent any
   stages {
      stage('Verify Branch') {
         when {
            anyOf {
               changeset "catalogosms/**"
            }
         }         
         steps {
            echo "$GIT_BRANCH"

         }
      }

      // stage('Docker Build') {
      //    steps {
      //       sh "docker images -a"
      //       sh "docker build -t jenkins-pipeline ./catalogos-microservice/."
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
         when {
            anyOf {
               changeset "catalogosms/**"
            }
         }                  
         environment {
            WEB_IMAGE_NAME="${ACR_LOGINSERVER}/siaraf/indep-siaraf_catalogos:1.${BUILD_NUMBER}"
         }
         steps {
            echo "Workspace is $WORKSPACE"
            dir("$WORKSPACE/catalogosms")
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
         when {
            anyOf {
               changeset "catalogosms/**"
            }
         }                  
         environment {
            ENVIRONMENT = 'qa'
            WEB_IMAGE_NAME="${ACR_LOGINSERVER}/siaraf/indep-siaraf_catalogos:1.${BUILD_NUMBER}"
         }
         steps {
            echo "Deploying to ${ENVIRONMENT}"
         
            sh(script: """
            # Update kubernetes deployment with new image.
            kubectl set image deployment/catalogosms catalogosms="$WEB_IMAGE_NAME"
            """)

         }
      }

   }
   
}
