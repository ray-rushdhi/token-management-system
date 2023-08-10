import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tokenSort'
})
export class TokenSortPipe implements PipeTransform {
  transform(tokens: any[]): any[] {
    const invalidatedTokens = tokens.filter(token => token.state === 'INVALIDATED');
    const validTokens = tokens.filter(token => token.state !== 'INVALIDATED');
    return [...validTokens, ...invalidatedTokens];
  }

}
