<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

require_once('getPlaces.php');
use App\Http\Controllers\GcpPlaces\SearchPlaces;

class PlacesController extends Controller
{
  public function searchAndGet(Request $request) {
    $places = new SearchPlaces();
    $res = $places->getPlaces($request->query('latlong'), $request->query('radius'));
    return $res;
  }
}
