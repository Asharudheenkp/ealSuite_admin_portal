<?php

namespace App\Constants;

class InvoiceConstants
{
    const TYPE = 'invoice';
    const PAGINATION = 8;

    const UNPAID = 0;
    const PAID = 1;
    const CANCELLED = 2;

    const STATUS = [
        self::UNPAID => 'Unpaid',
        self::PAID => 'Paid',
        self::CANCELLED => 'Cancelled',
    ];
}
