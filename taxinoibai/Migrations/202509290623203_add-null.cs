namespace taxinoibai.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addnull : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Contacts", "WaitingTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Contacts", "WaitingTime", c => c.DateTime(nullable: false));
        }
    }
}
