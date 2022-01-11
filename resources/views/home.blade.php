@extends('layouts.app')
@section('script')
    <script src="{{ asset('js/homeGetCategory.js') }}" defer></script>
    <script src="{{ asset('Drag-Drop/jquery.mjs.nestedSortable.js') }}"></script>
@endsection
@section('content')
    <ol class="sortable" id="categoryList">
    </ol>
@endsection
