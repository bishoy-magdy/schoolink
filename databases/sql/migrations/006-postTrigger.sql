CREATE TRIGGER postTrigger AFTER INSERT ON post FOR EACH ROW
BEGIN
	INSERT INTO postDescription(userId, title, url, poastedAt) VALUES 
	(
		NEW.userId, 
		NEW.title, 
		NEW.url, 
		NEW.poastedAt
	);
END;
