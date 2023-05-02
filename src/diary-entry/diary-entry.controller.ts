import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJWTGuard } from '../auth/guards/auth.guard';
import { DiaryEntryService } from './diary-entry.service';
import { DiaryEntry } from './diary-entry.model';
import { CreateDiaryEntryDto } from './dto/createDiaryEntry.dto';
import { QueryParamsPipe } from '../requestFeatures/queryParams.pipe';
import { CurrentUserArgs } from '../auth/decorators/currentUserArgs.decorator';
import QueryParameters from '../requestFeatures/query.params';

@ApiTags("Diary entry")
@Controller('diary-entry')
@UseGuards(AuthJWTGuard)
export class DiaryEntryController {

     constructor(private diaryEntryService: DiaryEntryService ) 
    {}

    @ApiOperation({ summary: "Diary entry creation" })
    @ApiOkResponse({ type: DiaryEntry })
    @Post()
    createDiaryEntry(@Body() diaryEntryDto: CreateDiaryEntryDto) {
        return this.diaryEntryService.createDiaryEntry(diaryEntryDto);
    }

    @ApiOperation({ summary: 'Get diary entries' })
    @ApiOkResponse({ type: '{rows:DiaryEntry[],count:number}' })
    @Get()
    getDiaryEntries(
      @Query(new QueryParamsPipe()) filters: QueryParameters,
      @CurrentUserArgs() currentUser: CurrentUserArgs
    ): any {
      return this.diaryEntryService.getDiaryEntries(filters,currentUser.userId);
    }
    @ApiOperation({ summary: 'Delete diary entries' })
    @Delete(':id')
    deleteTweet(@Param('id') id: string) {
      return this.diaryEntryService.deleteDiaryEntry(id);
    }
}
