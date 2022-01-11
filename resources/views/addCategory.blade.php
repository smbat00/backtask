@extends('layouts.app')
@section('script')
    <script src="{{ asset('js/getCategory.js') }}" defer></script>
    <script src="{{ asset('js/addNewCategory.js') }}" defer></script>
    <script src="{{ asset('js/showAllCategory.js') }}" defer></script>
    <script src="{{ asset('js/editCategoryName.js') }}" defer></script>

@endsection
@section('content')
    <div class="container">
        <div id="notification"></div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                    <label for="parent_id">Paren Category</label>
                    <select name="parent_id" id="parent_id">
                        <option value=""></option>
                    </select>
                    <label for="name">Category Name</label>
                    <input id="name" type="text" name="name" placeholder="Category Name">
                    <input id="addCategory" type="submit" value="Add Category">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div >
                    <ul class="sortable" id="categoryShowList">
                    </ul>
                </div>
            </div>
            <div id="formodal">
                <!-- Modal -->
                <div style="display: none" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Category Name</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <input type="text" id="catName" value="name">
                                <input type="hidden" id="catId" value="id">
                            </div>
                            <div class="modal-footer">
                                <span  id="editCategoryName"  class="btn btn-secondary sendButton" data-bs-dismiss="modal">Save</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
