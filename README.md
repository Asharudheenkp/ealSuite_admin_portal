# Simple Admin Portal

This project involves building a simple admin portal using **PHP** (Laravel - Inertia - Tailwind - React). It allows admin users to manage customers and invoices. The portal includes features such as customer addition, modification, and invoice generation.


### Login Page
- A login page with input fields for **username** and **password**.


### Admin Portal
- Upon successful login, redirect to an admin portal with a left navigation bar containing **"Customer"** and **"Invoice"** sections.

#### Customer Section
- **List Page:** Display a list of customers with basic information.
- **Create Page:** Allow the addition of new customers.
- **Edit Page:** Enable modification of existing customer details.

#### Invoice Section
- **List Page:** Display a list of invoices with basic information.
- **Create Page:** Allow creation of new invoices linked to customers.
- **Edit Page:** Enable modification of existing invoices.

## Setup Instructions

## Step 1: Clone the Repository

```bash
git clone https://github.com/Asharudheenkp/ealSuite_admin_portal.git
cd ealSuite_admin_portal


Follow these steps to set up the environment and run the application:

## 1. Update Composer Dependencies

First, run `composer update` to install or update all PHP dependencies.

```bash
composer update

## 2. Install NPM Dependencies

Once Composer dependencies are updated, you need to install JavaScript dependencies. Run the following command:

```bash
npm install

## 3. Create and Configure `.env` File

Next, you need to set up your environment configuration. Copy the `.env.example` file to a new `.env` file:

```bash
cp .env.example .env

## 4. Generate Application Key

Laravel requires an application key to secure user sessions and other encrypted data. Run the following command to generate the key:

```bash
php artisan key:generate

## 5. Run Database Migrations

Run the migrations to create the necessary tables in your database:

```bash
php artisan migrate

## 6. Seed Database with Initial User

Next, you need to seed the database with an initial user. Run the following command:

```bash
php artisan db:seed

it will create a user to login

## 7. Start the Laravel Development Server

Now, start the Laravel development server:

```bash
php artisan serve


## 8. Start the Frontend Development Server

In another terminal window, run the following command to start the frontend development server:

```bash
npm run dev


## 9. Login with Default Admin Credentials

Once the servers are running, you can access the application at `http://127.0.0.1:8000`. Use the following credentials to log in:

- **Email**: `admin@gmail.com`
- **Password**: `password123`

You should now be logged in and redirected to the admin portal.
