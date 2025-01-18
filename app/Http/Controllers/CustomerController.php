<?php

namespace App\Http\Controllers;

use App\Constants\CustomerConstants;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display the customer view using Inertia. (can send customers data from here)
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Customer', [
            'type' => CustomerConstants::TYPE
        ]);
    }
}
