FROM cr.freeb.vip/freeb/nav-cache:latest AS builder

COPY . /data/app
RUN go build -ldflags="-s -w" -o ./bin/server ./cmd/server


FROM cr.freeb.vip/docker/library/alpine:3.14
RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories


RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

WORKDIR /data/app
COPY --from=builder /data/app/bin /data/app
COPY --from=builder /data/app/web/upload /data/app/web/upload/
RUN mkdir -p /data/app/storage/

EXPOSE 8000
ENTRYPOINT [ "./server" ]
