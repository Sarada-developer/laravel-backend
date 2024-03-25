<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function addUser(Request $request){
        $data = $request->all();
        if (empty($data)) {
            return response()->json(['res_code' => 201, 'response' => 'Parameter is missing.'], 200);
        }

        $rules = [
            'full_name' => 'required',
            'role'=>'required',
            'email' => 'required|string|email|unique:users|max:255'
        ];
        $messages = [
            'full_name.required' => 'Full Name is required.',
            'email.required' => 'Email id is required.',
            'email.email' => 'Please enter valid email id.',
            'email.unique' => 'This email is already exists in account.',
            'role.required'=>'Role is required'
        
        ];
        $validator = Validator::make($data, $rules, $messages);
        if ($validator->fails()) {
            $validator = $validator->errors();
            $fullname = $validator->first('full_name');
            $email = $validator->first('email');
           $role = $validator->first('role');

            if (!empty($fullname)) {
                $error = $fullname;
            }  else if (!empty($email)) {
                $error = $email;
            }  else if (!empty($role)) {
                $error = $role;
            }
            return response()->json(['res_code' => 201, 'response' => $error], 200);
        }else{
            try {
                $user = new User();
                $full_name = $data['full_name'] ? $data['full_name'] : '';
                $user->fullname = $full_name;
                $user->role_id = $data['role'];
                $user->email = $data['email'] ? $data['email'] : '';
                $user->save();
                return response()->json([
                    'res_code' => 200,
                    'response' => "You have successfully registered ", 'data' => $data
                ], 200);
            } catch (\Throwable $th) {
                return response()->json([
                    'res_code' => 201,
                    'response' => $th->getMessage(), 'message' => $th->getMessage()
                    // 'response' => "Somthing went wrong ", 'message' => $th->getMessage()
                ], 200);
            }
        }
    }

    public function getUsers(){
        $users = User::with('role')->get();
        if($users){
            return response()->json(['res_code'=>200,'response'=>$users]);
        }else{
            return response()->json(['res_code'=>200,'response'=>'Users not found']);
        }
        
    }
}
