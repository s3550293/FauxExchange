package com.g4.fauxexchange;

import com.g4.fauxexchange.model.LeaderboardInfo;

import org.junit.Test;
import static org.junit.Assert.*;

public class FauxExchangeLeaderboardUnitTest {
    LeaderboardInfo leaderboardinfo = new LeaderboardInfo("TestFName",1,20.50);

    @Test
	public void TestName() {
		assertNotNull(leaderboardinfo.getName());
	}
	
	@Test
	public void TestRank() {
		assertNotNull(leaderboardinfo.getRank());
	}

	@Test
	public void TestValue() {
		assertNotNull(leaderboardinfo.getValue());
	}
}