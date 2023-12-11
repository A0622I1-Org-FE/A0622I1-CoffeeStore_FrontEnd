import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRecipeDto} from '../modal/IRecipeDto';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private CREATE_RECIPE = 'http://localhost:8080/api/private/list/createRecipe';
  constructor(
    private http: HttpClient
  ) {}
  addRecipeforService(recipeList: IRecipeDto[]): Observable<IRecipeDto[]> {
    return this.http.post<IRecipeDto[]>(this.CREATE_RECIPE, recipeList);
  }
}
