#!groovy
import java.text.*

// pod utilisé pour la compilation du projet
podTemplate(label: 'meltingpoc-parcours-integration-pod', nodeSelector: 'medium', containers: [

  // le slave jenkins
  containerTemplate(name: 'jnlp', image: 'jenkinsci/jnlp-slave:alpine'),

  // un conteneur node pour construire le dist
  containerTemplate(name: 'node', image: 'node', command: 'cat', ttyEnabled: true),

  // un conteneur pour construire les images docker
  containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),

  // un conteneur pour déployer les services kubernetes
  containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl', command: 'cat', ttyEnabled: true)],

  // montage nécessaire pour que le conteneur docker fonction (Docker In Docker)
  volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
) {

  node('meltingpoc-parcours-integration-pod') {

    def branch = env.JOB_NAME.replaceFirst('.+/', '')

    properties([
      buildDiscarder(
        logRotator(
          artifactDaysToKeepStr: '1',
          artifactNumToKeepStr: '1',
          daysToKeepStr: '3',
          numToKeepStr: '3'
        )
      )
    ])

    def now = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())

    deleteDir()

    stage('checkout sources') {
      checkout scm
    }

    container('node') {
      stage('build IHM dist') {
        sh 'npm install'
        sh 'npm run-script build'
      }
    }

    container('docker') {

      stage('build docker image') {


        sh 'mkdir /etc/docker'

        // le registry est insecure (pas de https)
        sh 'echo {"insecure-registries" : ["registry.k8.wildwidewest.xyz"]} > /etc/docker/daemon.json'

        withCredentials([string(credentialsId: 'nexus_password', variable: 'NEXUS_PWD')]) {

          sh "docker login -u admin -p ${NEXUS_PWD} registry.k8.wildwidewest.xyz"
        }

        sh "docker build -t registry.k8.wildwidewest.xyz/repository/docker-repository/pocs/meltingpoc-parcours-integration:$now ."
        sh "docker push registry.k8.wildwidewest.xyz/repository/docker-repository/pocs/meltingpoc-parcours-integration:$now"
      }
    }

    container('kubectl') {

      stage('deploy') {

                build job: "/SofteamOuest/chart-run/master",
                        wait: false,
                        parameters: [[$class: 'StringParameterValue', name: 'image', value: "$now",
                                $class: 'StringParameterValue', name: 'chart', value: "parcours-integration"]]

      }
    }
  }
}
