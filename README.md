# Node.js Microservices Deployed on EC2 Container Service

This is a reference architecture that shows the evolution of a Node.js application from a monolithic
application that is deployed directly onto instances with no containerization or orchestration, to a
containerized microservices architecture orchestrated using Amazon EC2 Container Service.

X-Ray Traces has been added to the source code to be able to see the traces on the AWS X-Ray console. For a correct configuration it is important to add this env variable in the containers:

```bash
export XRAY_URL="DNS_Name_Of_the_Xray_container"
```

- [Part One: The base Node.js application](1-no-container/)
- [Part Two: Moving the application to a container deployed using ECS](2-containerized/)
- [Part Three: Breaking the monolith apart into microservices on ECS](3-microservices/)
