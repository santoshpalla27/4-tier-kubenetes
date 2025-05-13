FROM node:23-alpine3.20
WORKDIR /app

COPY package.json  .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]  



# # Stage 1: Build
# FROM node:23-alpine3.20 AS builder

# WORKDIR /app

# # Copy package.json and package-lock.json if available
# COPY package*.json ./

# # Install dependencies (including dev dependencies)
# RUN npm install

# # Copy the rest of the source code
# COPY . .

# # Optionally build the app if you have a build step (uncomment if needed)
# # RUN npm run build

# # Stage 2: Production
# FROM node:23-alpine3.20 AS production

# WORKDIR /app

# # Copy only necessary files from the builder stage
# COPY --from=builder /app ./

# # If you're using `npm ci` for production and you have package-lock.json:
# # RUN npm ci --only=production

# # Or, remove dev dependencies (if needed):
# # RUN npm prune --production

# EXPOSE 3000

# CMD ["npm", "start"]
