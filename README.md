# Serverless-ACL demo

This repository contains the basic structure of a serverless ACL. To have this tool function correctly you need to define a valid URL within the domain logic to successfully hit external third party APIs.

## Built with
-  NodeJs
- Swarmion

## Deploy ACL
- Clone the repo: git clone https://github.com/greg-torrington/serverless-acl.git
- In your local CLI with you AWS credentials configured, run: 
    - pnpm i
    - cdk synth
    - cdk bootstrap
    - cdk deploy
