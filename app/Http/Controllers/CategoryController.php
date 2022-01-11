<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function getCategory(){
        $categoryList = Category::with('childrenCategories')->where('parent_id',null)->get();
        return response()->json(['category' => $categoryList]);
    }

    public function addNewCategory(Request $request){
        $new_category = new Category();
        $new_category->name = $request->get('category_name');
        $new_category->parent_id = $request->get('parent_id');
        $new_category->save();
        $messages = $request->get('category_name') . ' category added';
        return response()->json(['messages' => $messages]);

    }

    public function moveCategory(Request $request){
        $moveCat = Category::find($request->get('category_id'));
        $moveCat->parent_id = $request->get('category_parent_id');
        $moveCat->save();
        return response()->json(['messages' => 'ok']);

    }

    public function editCategory(Request $request){
        $editCat = Category::find($request->get('catId'));
        $editCat->name = $request->get('catName');
        $editCat->save();
        $messages = $request->post('category_name') . ' category name changed';
        return response()->json(['messages' => $messages]);
    }
}
