FROM node:24.15.0-slim

# Instalar pnpm globalmente
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]