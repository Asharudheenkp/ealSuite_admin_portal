<?php

namespace App\Http\Controllers;

use App\Constants\CustomerConstants;

use App\Models\Customer;

use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display the customer view using Inertia. (can send customers data from here)
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Customer/Index', [
            'type' => CustomerConstants::TYPE
        ]);
    }

    public function create()
    {
        return Inertia::render('Customer/Create', [
            'type' => CustomerConstants::TYPE
        ]);
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('Customer/Edit', [
            'type' => CustomerConstants::TYPE,
            'customer' => $customer
        ]);
    }
}
