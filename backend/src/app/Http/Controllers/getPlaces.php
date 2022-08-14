<?php

namespace App\Http\Controllers\GcpPlaces;

use Illuminate\Support\Facades\Http;

class SearchPlaces
{
  public function getPlaces($location, $radius)
  {
    $response = Http::acceptJson()->get(config('services.gcp.placesApiUrl'), [
      'key' => config('services.gcp.placesApiKey'),
      'location' => $location,
      'radius' => $radius,
    ]);
    return $response->getBody();
  }
}