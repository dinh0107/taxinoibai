namespace taxinoibai.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class contactedit : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contacts", "FullName", c => c.String(nullable: false, maxLength: 100));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Contacts", "FullName");
        }
    }
}
