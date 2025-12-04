pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_URL = "623609396310.dkr.ecr.ap-south-1.amazonaws.com"
        AWS_CREDENTIALS = credentials('aws-credentials')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Run Basic Tests') {
            steps {
                sh '''
                echo "Running basic tests... (placeholder)"
                '''
            }
        }

        stage('SonarQube Analysis (Optional)') {
            steps {
                echo "SonarQube not installed — skipping"
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("auth-service:latest", "./auth-service")
                    docker.build("product-service:latest", "./product-service")
                    docker.build("frontend-service:latest", "./frontend-service")
                }
            }
        }

        stage('Security Scan with Trivy') {
            steps {
                sh '''
                echo "Running Trivy Security Scan..."
                trivy image auth-service:latest || true
                trivy image product-service:latest || true
                trivy image frontend-service:latest || true
                '''
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'aws-credentials']]) {

                    sh '''
                    aws ecr get-login-password --region $AWS_REGION \
                        | docker login --username AWS --password-stdin $ECR_URL
                    '''
                }
            }
        }

        stage('Tag & Push Images to ECR') {
            steps {
                script {
                    sh """
                    docker tag auth-service:latest $ECR_URL/auth-service:latest
                    docker push $ECR_URL/auth-service:latest

                    docker tag product-service:latest $ECR_URL/product-service:latest
                    docker push $ECR_URL/product-service:latest

                    docker tag frontend-service:latest $ECR_URL/frontend-service:latest
                    docker push $ECR_URL/frontend-service:latest
                    """
                }
            }
        }
    }
}
