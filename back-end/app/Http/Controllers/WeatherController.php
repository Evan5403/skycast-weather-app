<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function getWeatherData(Request $request)
    {
        $client = new Client();

        $city = $request->query('city', 'nairobi'); // Default to Nairobi
        $units = $request->query('units', 'metric'); // 'metric' = °C, 'imperial' = °F
        $apiKey = '2b436024c3f31f8ebb73283c3534bd6f';

        try {
            // Get current weather
            $currentResponse = $client->get('https://api.openweathermap.org/data/2.5/weather', [
                'query' => [
                    'q' => $city,
                    'appid' => $apiKey,
                    'units' => $units,
                ],
                'verify' => false,
            ]);

            $currentWeather = json_decode($currentResponse->getBody()->getContents(), true);

            // Get 5-day forecast
            $forecastResponse = $client->get('https://api.openweathermap.org/data/2.5/forecast', [
                'query' => [
                    'q' => $city,
                    'appid' => $apiKey,
                    'units' => $units,
                ],
                'verify' => false,
            ]);

            $forecastData = json_decode($forecastResponse->getBody()->getContents(), true);

            // Group forecast by date
            $groupedForecast = [];

            foreach ($forecastData['list'] as $entry) {
                $date = date('Y-m-d', strtotime($entry['dt_txt']));
                if (!isset($groupedForecast[$date])) {
                    $groupedForecast[$date] = [];
                }
                $groupedForecast[$date][] = $entry;
            }

            // Reduce to 3 days
            $threeDayForecast = array_slice($groupedForecast, 0, 3);

            return response()->json([
                'city' => $city,
                'current' => $currentWeather,
                'forecast' => $threeDayForecast,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Unable to fetch weather data',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
