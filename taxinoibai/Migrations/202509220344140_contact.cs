namespace taxinoibai.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class contact : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "WaitingTime", c => c.Int(nullable: false));
            AddColumn("dbo.Contacts", "Twoways", c => c.Boolean(nullable: false));
            AddColumn("dbo.Contacts", "Bill", c => c.Boolean(nullable: false));
            AddColumn("dbo.Contacts", "PickUpTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.Contacts", "StopPoints", c => c.String());
            DropColumn("dbo.Contacts", "ToDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contacts", "ToDate", c => c.DateTime());
            DropColumn("dbo.Contacts", "StopPoints");
            DropColumn("dbo.Contacts", "PickUpTime");
            DropColumn("dbo.Contacts", "Bill");
            DropColumn("dbo.Contacts", "Twoways");
            DropColumn("dbo.Contacts", "WaitingTime");
        }
    }
}
