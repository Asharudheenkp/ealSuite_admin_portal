<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display the invoice view using Inertia.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Invoice');
    }
}
