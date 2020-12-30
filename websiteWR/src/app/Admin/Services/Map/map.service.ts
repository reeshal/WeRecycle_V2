import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private http: HttpClient) {}

  getOptimisedRoute(
    coordinates: { lng: number; lat: number }[]
  ): Observable<any> {
    let new_coordinates = coordinates
      .map((c) => {
        return this.objectToArraystring(c);
      })
      .join(';');

    return this.http.get(
      `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${new_coordinates}?geometries=geojson&source=first&roundtrip=true&access_token=${environment.mapbox.accessToken}`
    );
  }

  objectToArraystring(obj: any) {
    var keys = Object.keys(obj);
    var routeGeoJSON = keys.map(function (key) {
      return obj[key];
    });
    return routeGeoJSON;
  }
}
