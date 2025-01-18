<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Services\UserServices;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public $userServices;
    
    /**
     * Constructor for the UserController class.
     *
     * @param UserServices $userServices
     */
    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }

    /**
     * Retrieve paginated data of a specified type.
     *
     * @param Request $request
     * @param string $type
     * @return \Illuminate\Http\JsonResponse
     */
    public function getData(Request $request, $type)
    {
        $perPage = $request->input('per_page', 15);

        $data = $this->userServices->getData($type, $perPage);
        if ($data === null) {
            return response()->json(['status' => false, 'message' => 'Invalid type provided'], 400);
        }

        return response()->json(['status' => true, 'data' => $data]);
    }


    /**
     * Handles the creation of a new data entry based on the provided type.
     *
     * @param Request $request
     * @param string $type
     * @return \Illuminate\Http\JsonResponse
     */
    public function createData(Request $request, $type)
    {
        $data = $this->userServices->validateRequest($request, $type);

        if ($data['status'] === false) {
            return response()->json($data);
        }

        $model = $this->userServices->createData($data['validated'], $type);

        return response()->json([
            'status' => true,
            'message' => ucfirst($type) . ' created successfully'
        ]);
    }

    /**
     * Edit an existing data entry of a specified type.
     *
     * @param Request $request
     * @param string $type
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function editData(Request $request, $type, $id)
    {
        $data = $this->userServices->validateRequest($request, $type, $id);

        if ($data['status'] === false) {
            return response()->json($data);
        }

        $model = $this->userServices->updateData($data['validated'], $type, $id);

        if (!$model) {
            return response()->json(['status' => false, 'message' => ucfirst($type) . ' not found']);
        }

        return response()->json([
            'status' => true,
            'message' => ucfirst($type) . ' updated successfully'
        ]);
    }
}
