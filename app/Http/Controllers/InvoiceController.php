<?php

namespace App\Http\Controllers;

use App\Constants\InvoiceConstants;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;

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
        return Inertia::render('Invoice/Index',[
            'type' => InvoiceConstants::TYPE
        ]);
    }

    /**
     * Display the form for creating a new invoice.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $customers = Customer::select('id', 'name')->get();
        return Inertia::render('Invoice/Create', [
            'type' => InvoiceConstants::TYPE,
            'status' => InvoiceConstants::STATUS,
            'customers' => $customers
        ]);
    }

    /**
     * Render the edit view for a specific invoice.
     *
     * @param Invoice $invoice
     * @return \Inertia\Response
     */
    public function edit(Invoice $invoice)
    {
        return Inertia::render('Invoice/Edit', [
           'type' => InvoiceConstants::TYPE,
            'status' => InvoiceConstants::STATUS,
            'customer' => $invoice
        ]);
    }
}
