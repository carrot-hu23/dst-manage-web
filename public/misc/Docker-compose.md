# docker-compose.yml 文件参考

```yaml
version: '3'
services:
  dst-admin-go:
    image: hujinbo23/dst-admin-go:1.3.0
    port:
      - "8084:8082"
      - "10999:10999"
      - "10998:10998"
    volumes:
      - ${PWD}/dstsave:/root/.klei/DoNotStarveTogether
      - ${PWD}/dstsave/back:/app/backup
      - ${PWD}/steamcmd:/app/steamcmd
      - ${PWD}/dst-dedicated-server:/app/dst-dedicated-server
      - ${PWD}/dstsave/dst-db:/app/dst-db
      - ${PWD}/dstsave/password.txt:/app/password.txt
      - ${PWD}/dstsace/first:/app/first
```