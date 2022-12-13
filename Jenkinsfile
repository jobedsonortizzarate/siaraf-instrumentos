pipeline {
   agent any
   stages {
      stage('Verify Branch') {
         steps {
            echo "$GIT_BRANCH"
         }
      }
       
      stage('Verify unit-test') {
         steps {
            echo "$GIT_BRANCH"
         }
      }
       
      stage('Verify test-coverage') {
         steps {
            echo "$GIT_BRANCH"
         }
      }

      stage('Push container') {
         environment {
            WEB_IMAGE_NAME="${ACR_LOGINSERVER}/siaraf/indep-siaraf_instrumentos:1.${BUILD_NUMBER}"
         }
         steps {
            echo "Workspace is $WORKSPACE"
            echo "WebImage is $WEB_IMAGE_NAME"
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
            #kubectl set image deployment/instrumentosms instrumentosms="$WEB_IMAGE_NAME"
            """)

         }
      }

   }
   
}
