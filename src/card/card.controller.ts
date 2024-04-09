import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('card')
@ApiTags('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('create')
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findById(id);
  }
  @Get('')
  findAll() {
    return this.cardService.getAll();
  }
}
