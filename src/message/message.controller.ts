import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthJWTGuard } from 'src/auth/guards/auth.guard';
import { MessageService } from './message.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageMood } from './messageMood.model';
import { CreateMessageMoodDto } from './dto/createMessageMood.dto';

@ApiTags("Message")
@Controller('message')
@UseGuards(AuthJWTGuard)
export class MessageController 
{  
    constructor(private messageService: MessageService ) 
    {}

    @ApiOperation({ summary: "Message mood creation" })
    @ApiOkResponse({ type: MessageMood })
    @Post("/message-mood")
    createMessageMood(@Body() messageMoodDto: CreateMessageMoodDto) {
        return this.messageService.createMessageMood(messageMoodDto);
    }
}
