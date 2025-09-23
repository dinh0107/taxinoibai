namespace taxinoibai.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fixcontact : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Contacts", "WaitingTime", c => c.DateTime(nullable: false));
            DropColumn("dbo.Contacts", "FullName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "FullName", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.Contacts", "WaitingTime", c => c.Int(nullable: false));
        }
    }
}
