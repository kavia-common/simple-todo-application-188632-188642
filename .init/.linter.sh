#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-todo-application-188632-188642/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

