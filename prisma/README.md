# PostgreSQL Schema and Migrations using Prisma

## Schema
The data model is defined in the `schema.prisma` file.

### See Also
  * [Prisma schema reference](https://www.prisma.io/docs/concepts/components/prisma-schema)

## Migrations
Use the following to generate migration scripts in response to changing the schema...  
### Step 1
```
export DATABASE_URL="postgresql://platform_admin:{PASSWORD}@{HOST}:5432/platform_db?schema={SCHEMA}"
```
Replace {PASSWORD}, {HOST} {SCHEMA} as appropriate:  
  * {PASSWORD} = platform_admin's password (AWS-hosted one is in AWS Secrets Manager)
  * {HOST} = `nonprod-tennisapp-aurora-postgres.cluster-c0acownh2cfz.us-east-2.rds.amazonaws.com`
  * {SCHEMA} = `dev_platform` 

### Step 2
Run `npx prisma migrate dev --create-only` to create a migration script. 

### Step 3
Inspect and make any manual changes to the migration script as required.  

### Step 4
Run `npx prisma migrate dev` to apply the migration.

### See also
  * [`prisma migrate` reference](https://www.prisma.io/docs/concepts/components/prisma-migrate)
  * [`prisma migrate` limitations and issues](https://www.prisma.io/docs/concepts/components/prisma-migrate/prisma-migrate-limitations-issues)

## Deployment
Set DATABASE_URL environment variable to point to the desired DB and schema, and run:
```
npx prisma migrate deploy
```
This will apply the migration scripts.

### See also
  * [Reconciling your migration history with a patch or hotfix](
https://www.prisma.io/docs/guides/database/patching-production#reconciling-your-migration-history-with-a-patch-or-hotfix)