import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJWTGuard } from 'src/auth/guards/auth.guard';
import { DiaryEntryService } from './diary-entry.service';
import { DiaryEntry } from './diary-entry.model';
import { CreateDiaryEntryDto } from './dto/createDiaryEntry.dto';

@ApiTags("Diary entry")
@Controller('diary-entry')
@UseGuards(AuthJWTGuard)
export class DiaryEntryController {

     constructor(private diaryEntryService: DiaryEntryService ) 
    {}

    @ApiOperation({ summary: "Diary entry creation" })
    @ApiOkResponse({ type: DiaryEntry })
    @Post()
    createDialog(@Body() diaryEntryDto: CreateDiaryEntryDto) {
        return this.diaryEntryService.createDiaryEntry(diaryEntryDto);
    }
}
