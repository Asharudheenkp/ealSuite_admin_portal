<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display the customer view using Inertia.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Customer');
    }
}
