## Description

This project is part of my learning journey in System Design and aims to build a solid codebase following Domain-Driven Design (DDD) principles. I also apply the CQRS (Command-Query Responsibility Segregation) pattern to clearly separate command and query responsibilities, allowing services to interact through Commands or Queries.

At a high level, I adopt a microservices architecture, using Kafka as the communication channel between services.

For observability, I plan to implement a complete stack including Prometheus for metrics collection, Grafana for visualization, Jaeger for distributed tracing, Loki for centralized logging, and OpenTelemetry as the unified instrumentation layer connecting them.

The project will be containerized using Docker for easier sharing and deployment, and Kubernetes (K8s) will be used for orchestration and container management. I’ll also use Helm charts to simplify application releases and upgrades on Kubernetes.

Regarding CI/CD, I’ll integrate GitHub Actions or GitLab CI for automated builds and testing on each merge to the main/master branch. Additionally, ArgoCD will handle continuous deployment, automatically syncing and deploying the latest container images after each release.

Finally, the application will be deployed on Amazon EKS (Elastic Kubernetes Service) and exposed to the internet through appropriate networking and load balancing configurations.

## Prerequisites

- NodeJS v22.16.0
- Docker
- AWS account
- Kubectl

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
