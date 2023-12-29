import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRecipeDto} from '../modal/IRecipeDto';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private CREATE_RECIPE = 'http://localhost:8080/api/private/list/createRecipe';
  private UPDATE_RECIPE = 'http://localhost:8080/api/private/list/updateRecipe';
  private DELETE_RECIPE = 'http://localhost:8080/api/private/list/deleteRecipe';
  private SELECT_RECIPE = 'http://localhost:8080/api/private/recipe';

  constructor(
    private http: HttpClient
  ) {
  }

  addRecipeForService(recipeList: IRecipeDto[]): Observable<IRecipeDto[]> {
    return this.http.post<IRecipeDto[]>(this.CREATE_RECIPE, recipeList);
  }

  findByServiceId(id: number): Observable<IRecipeDto[]> {
    return this.http.get<IRecipeDto[]>(`${this.SELECT_RECIPE}/${id}`);
  }

  deleteRecipeByServiceId(id: number): Observable<IRecipeDto[]> {
    return this.http.get<IRecipeDto[]>(`${this.DELETE_RECIPE}/${id}`);
  }

  updateRecipeForService(recipeList: IRecipeDto[]): Observable<IRecipeDto[]> {
    return this.http.post<IRecipeDto[]>(this.UPDATE_RECIPE, recipeList);
  }
}
