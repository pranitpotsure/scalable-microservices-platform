pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_URL = "623609396310.dkr.ecr.ap-south-1.amazonaws.com"
    }

    stages {

        /* ----------------------------------------------------
         * CHECKOUT CODE
         * ---------------------------------------------------- */
        stage('Checkout Code') {
            steps {
                git branch: 'dev',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/pranitpotsure/scalable-microservices-platform.git'
            }
        }

        /* ----------------------------------------------------
         * BASIC TEST PLACEHOLDER
         * ---------------------------------------------------- */
        stage('Run Basic Tests') {
            steps {
                sh '''
                echo "Running basic tests (placeholder)..."
                '''
            }
        }

        /* ----------------------------------------------------
         * SONARQUBE (SKIPPED BECAUSE NOT INSTALLED)
         * ---------------------------------------------------- */
        stage('SonarQube Analysis (Optional)') {
            steps {
                echo "SonarQube not installed — skipping analysis"
            }
        }

        /* ----------------------------------------------------
         * BUILD DOCKER IMAGES
         * ---------------------------------------------------- */
        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("auth-service:latest", "./auth-service")
                    docker.build("product-service:latest", "./product-service")
                    docker.build("frontend-service:latest", "./frontend-service")
                }
            }
        }

        /* ----------------------------------------------------
         * TRIVY SECURITY SCAN
         * ---------------------------------------------------- */
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

        /* ----------------------------------------------------
         * LOGIN TO AWS ECR
         * ---------------------------------------------------- */
        stage('Login to AWS ECR') {
            steps {
                withAWS(credentials: 'aws-credentials', region: "${AWS_REGION}") {
                    sh '''
                    aws ecr get-login-password --region $AWS_REGION \
                        | docker login --username AWS --password-stdin $ECR_URL
                    '''
                }
            }
        }

        /* ----------------------------------------------------
         * TAG & PUSH DOCKER IMAGES TO ECR
         * ---------------------------------------------------- */
        stage('Push Images to ECR') {
            steps {
                script {

                    sh """
                    echo "Pushing Auth Service..."
                    docker tag auth-service:latest $ECR_URL/auth-service:latest
                    docker push $ECR_URL/auth-service:latest
                    """

                    sh """
                    echo "Pushing Product Service..."
                    docker tag product-service:latest $ECR_URL/product-service:latest
                    docker push $ECR_URL/product-service:latest
                    """

                    sh """
                    echo "Pushing Frontend Service..."
                    docker tag frontend-service:latest $ECR_URL/frontend-service:latest
                    docker push $ECR_URL/frontend-service:latest
                    """
                }
            }
        }
    }
}
