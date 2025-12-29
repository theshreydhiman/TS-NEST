erDiagram
    USER {
        int UserId PK
        string UserName
        string FirstName
        string LastName
        string Email
        string Hash
        string Salt
        string RefreshToken
        string Token
        datetime LastActive
    }

    POST {
        int PostId PK
        string Description
        string Url
        int Likes
        int Comments
        string Tags
        datetime DateTimeUTC
        int UserId FK
    }

    COMMENT {
        int CommentId PK
        string Description
        int Likes
        int ParentId
        datetime DateTimeUTC
        int PostId FK
        int UserId FK
    }

    LIKE {
        int LikeId PK
        datetime DateTimeUTC
        int PostId FK
        int UserId FK
    }

    USER ||--o{ POST : creates
    USER ||--o{ COMMENT : writes
    USER ||--o{ LIKE : gives

    POST ||--o{ COMMENT : has
    POST ||--o{ LIKE : receives
