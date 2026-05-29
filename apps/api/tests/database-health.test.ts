import { appDataSource } from '../src/database'; // Reuse the shared database data source in tests.
import { getDatabaseHealthStatus } from '../src/services/database-health'; // Exercise the real health helper.

jest.mock('../src/database', () => ({ // Mock the database layer so tests stay isolated from PostgreSQL.
  appDataSource: { // Expose a small query-capable mock data source.
    isInitialized: false, // Start with the data source uninitialized by default.
    query: jest.fn(), // Allow tests to control the probe query outcome.
  }, // Finish the mocked app data source.
  initializeDatabase: jest.fn(), // Allow tests to control initialization outcome.
})); // Finish the database mock.

const mockedAppDataSource = appDataSource as unknown as { // Type the mocked query handle explicitly.
  isInitialized: boolean; // Track whether the mocked data source is initialized.
  query: jest.MockedFunction<(sql: string) => Promise<unknown>>; // Model the query mock accurately.
}; // Finish the mocked data source type.

const mockedInitializeDatabase = jest.requireMock('../src/database').initializeDatabase as jest.MockedFunction<() => Promise<unknown>>; // Capture the mocked initializer with a concrete type.

describe('getDatabaseHealthStatus', () => { // Cover the database readiness helper directly.
  beforeEach(() => { // Reset the mocked database layer before each test.
    mockedAppDataSource.isInitialized = false; // Reset the initialization flag explicitly.
    mockedAppDataSource.query.mockReset(); // Clear the query mock state.
    mockedInitializeDatabase.mockReset(); // Clear the initializer mock state.
  }); // Finish per-test setup.

  it('returns connected when initialization and probing succeed', async () => { // Verify the healthy database path.
    mockedInitializeDatabase.mockResolvedValue(mockedAppDataSource); // Simulate successful initialization.
    mockedAppDataSource.query.mockResolvedValue([{ '?column?': 1 }]); // Simulate a successful probe query.

    await expect(getDatabaseHealthStatus()).resolves.toBe('connected'); // Expect a connected health result.
    expect(mockedInitializeDatabase).toHaveBeenCalledTimes(1); // Ensure initialization ran once.
    expect(mockedAppDataSource.query).toHaveBeenCalledWith('SELECT 1'); // Ensure the helper performs the probe query.
  }); // Finish the healthy helper test.

  it('returns disconnected when initialization fails', async () => { // Verify the degraded database path.
    mockedInitializeDatabase.mockRejectedValue(new Error('db down')); // Simulate failed initialization.

    await expect(getDatabaseHealthStatus()).resolves.toBe('disconnected'); // Expect a disconnected health result.
    expect(mockedAppDataSource.query).not.toHaveBeenCalled(); // Ensure no probe query runs after init failure.
  }); // Finish the degraded helper test.
}); // Finish the suite.
