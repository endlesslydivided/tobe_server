import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BotMessageService } from './bot-message.service';
import { CreateBotMessageDto } from './dto/createBotMessage.dto';
import { BotMessage } from './diary-entry.model';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthJWTGuard } from 'src/auth/guards/auth.guard';

@ApiTags("Bot message")
@Controller('bot-message')
@UseGuards(AuthJWTGuard)
export class BotMessageController {

    constructor(private botMessageService: BotMessageService ) 
    {}

    @ApiOperation({ summary: "Bot message creation" })
    @ApiOkResponse({ type: BotMessage })
    @Post()
    createDialog(@Body() botMessageDto: CreateBotMessageDto) {
        return this.botMessageService.createBotMessage(botMessageDto);
    }
}
