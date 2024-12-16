"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const blog_service_1 = require("../blog/blog.service");
let CommentsService = class CommentsService {
    constructor(commentsRepository, blogService) {
        this.commentsRepository = commentsRepository;
        this.blogService = blogService;
    }
    async create(createCommentDto, user) {
        const post = await this.blogService.findOne(createCommentDto.postId);
        const comment = this.commentsRepository.create({
            content: createCommentDto.content,
            user,
            post,
        });
        return this.commentsRepository.save(comment);
    }
    async findMany(blogId) {
        console.info("blogId", blogId);
        return this.commentsRepository.find({
            where: { post: { id: blogId } },
            relations: ["user", "post"],
        });
    }
    async findOne(id) {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ["user", "post"],
        });
        if (!comment) {
            throw new common_1.NotFoundException("Comment not found");
        }
        return comment;
    }
    async remove(id, user) {
        const comment = await this.findOne(id);
        if (comment.user.id !== user.id) {
            throw new common_1.UnauthorizedException();
        }
        await this.commentsRepository.delete(id);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        blog_service_1.BlogService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map