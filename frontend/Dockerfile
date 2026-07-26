FROM node:22-alpine

WORKDIR /app

# Copy dependency files first for build caching
COPY package.json package-lock.json ./

RUN npm ci

# Copy the rest of the frontend
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]