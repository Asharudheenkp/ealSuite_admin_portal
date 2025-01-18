<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
class UserServices
{

    /**
     * Retrieve paginated data for customers or invoices based on the specified type.
     *
     * @param string $type
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|null
     */
    public function getData($type, $perPage = 15)
    {
        if ($type == 'customer') {
            return Customer::withCount('invoices')->paginate($perPage);
        } elseif ($type == 'invoice') {
            return Invoice::with('customer')->select('customer_id', 'date', 'amount', 'status')->paginate($perPage);
        } else {
            return null;
        }
    }

    /**
     * Validates the given request based on the specified type and optional ID.
     *
     * @param Request $request
     * @param string $type
     * @param int|null $id
     * @return array
     */
    public function validateRequest(Request $request, $type, $id = null)
    {
        $rules = $this->getValidationRules($type, $id);

        try {
            $validated = $request->validate(rules: $rules);
        } catch (ValidationException $e) {
            return ['status' => false, 'errors' => $e->errors(), 'message' => $e->getMessage()];
        }

        return ['status' => true, 'validated' => $validated];
    }

    /**
     * Get validation rules for the specified type.
     *
     * @param string $type
     * @param int|null $id
     * @return array
     */
    public function getValidationRules($type, $id = null)
    {
        $rules = [
            'customer' => [
                'name' => 'required|string|max:100',
                'phone' => 'nullable|digits:10',
                'email' => 'nullable|email|max:150',
                'address' => 'nullable|max:250'
            ],
            'invoice' => [
                'customer_id' => 'required|exists:customers,id',
                'date' => 'required|date',
                'amount' => 'required|integer',
                'status' => 'required'
            ]
        ];


        if ($id) {
            if ($type === 'customer') {
                $rules['customer']['email'] = 'nullable|email|max:150|unique:customers,email,' . $id;
            } elseif ($type === 'invoice') {
                $rules['invoice']['customer_id'] = 'required|exists:customers,id';
            }
        }

        return $rules[$type] ?? [];
    }

    /**
     * Creates a new customer or invoice record based on the specified type.
     *
     * @param array $input
     * @param string $type
     * @return \App\Models\Customer|\App\Models\Invoice|null
     */
    public function createData(array $input, $type)
    {
        if ($type === 'customer') {
            return Customer::create([
                'name' => $input['name'],
                'phone' => array_key_exists('phone', $input) ? $input['phone'] : '',
                'email' => array_key_exists('email', $input) ? $input['email'] : '',
                'address' => array_key_exists('address', $input) ? $input['address'] : '',
            ]);
        } elseif ($type === 'invoice') {
            return Invoice::create([
                'customer_id' => $input['customer_id'],
                'date' => $input['date'],
                'amount' => $input['amount'],
                'status' => $input['status']
            ]);
        }

        return null;
    }

    /**
     * Updates an existing customer or invoice record with the provided data.
     *
     * @param array $input
     * @param string $type
     * @param int $id
     * @return \App\Models\Customer|\App\Models\Invoice|null
     */
    public function updateData(array $input, $type, $id)
    {
        $data = null;

        if ($type === 'customer') {
            $data = Customer::find($id);
            if ($data) {
                $data->update([
                    'name' => $input['name'],
                    'phone' => array_key_exists('phone', $input) ? $input['phone'] : '',
                    'email' => array_key_exists('email', $input) ? $input['email'] : '',
                    'address' => array_key_exists('address', $input) ? $input['address'] : '',
                ]);
            }
        } elseif ($type === 'invoice') {
            $data = Invoice::find($id);
            if ($data) {
                $data->update([
                    'customer_id' => $input['customer_id'],
                    'date' => $input['date'],
                    'amount' => $input['amount'],
                    'status' => $input['status']
                ]);
            }
        }

        return $data;
    }
}
